import { useState } from "react";
import { Plus, Image, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { postApi } from "@/api/post";
import { uploadApi } from "@/api/awsS3/uploadApi";

interface CreatePostModalProps {
  onPostCreated?: () => void;
}

interface UploadedImage {
  url: string;
  previewUrl: string;
}

export default function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [content, setContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (uploadedImages.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    const filePreviewPromises = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    const previews = await Promise.all(filePreviewPromises);

    setIsUploadingImage(true);
    try {
      const response = await uploadApi.uploadImages(files);

      const newImages = response.imageUrls.map((url, index) => ({
        url,
        previewUrl: previews[index],
      }));

      setUploadedImages((prev) => [...prev, ...newImages]);
      toast.success(`${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully`);

      if (event.target) event.target.value = "";
    } catch (error) {
      console.error("❌ Error uploading images:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = async (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    console.log("🚀 Submitting post:", {
      content: content.trim(),
      imageUrls: uploadedImages.map((img) => img.url),
    });

    setIsLoading(true);

    try {
      const result = await postApi.createPost({
        content: content.trim(),
        imageUrls: uploadedImages.map((img) => img.url),
      });

      console.log("✅ Post created successfully:", result);
      toast.success("Post created successfully!");
      setIsOpen(false);
      resetForm();
      onPostCreated?.();
    } catch (error) {
      console.error("❌ Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setContent("");
    setUploadedImages([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Share your thoughts and add images</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea id="content" placeholder="What are you thinking about?" value={content} onChange={(e) => setContent(e.target.value)} className="resize-none" rows={4} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="images">Images (up to 5) {isUploadingImage && <span className="text-xs text-muted-foreground ml-2">Uploading...</span>}</Label>
              <div className="flex items-center gap-2">
                <Input id="images" type="file" accept="image/jpeg,image/jpg,image/png,image/gif" multiple onChange={handleImageUpload} className="hidden" disabled={isUploadingImage || isLoading} />
                <Button type="button" variant="outline" onClick={() => document.getElementById("images")?.click()} className="flex items-center gap-2" disabled={isUploadingImage || isLoading || uploadedImages.length >= 5}>
                  {isUploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Image className="h-4 w-4" />}
                  {isUploadingImage ? "Uploading..." : "Add Images"}
                </Button>
              </div>

              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image.previewUrl} alt={`Image ${index + 1}`} className="w-full h-20 object-cover rounded-md" />
                      <Button type="button" variant="destructive" size="sm" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0" onClick={() => removeImage(index)} disabled={isLoading || isUploadingImage}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading || isUploadingImage}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isUploadingImage}>
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
