import { useState } from 'react';
import { Plus, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';
import { postApi } from '@/api/post';

interface CreatePostModalProps {
    onPostCreated?: () => void;
}

export default function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);

        if (images.length + files.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }

        // Check file size
        const maxSize = 5 * 1024 * 1024; // 5MB
        const invalidFiles = files.filter(file => file.size > maxSize);

        if (invalidFiles.length > 0) {
            toast.error('File size should not exceed 5MB');
            return;
        }

        setImages(prev => [...prev, ...files]);

        // Create image previews
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviews(prev => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error('Post content cannot be empty');
            return;
        }

        console.log('🚀 Submitting post:', {
            content: content.trim(),
            imagesCount: images.length,
            images: images.map(img => ({ name: img.name, size: img.size }))
        });

        setIsLoading(true);

        try {
            // Отправляем пост напрямую в ваш API - он сам обработает изображения
            const result = await postApi.createPost({
                content: content.trim(),
                images // Ваш бэкенд уже умеет обрабатывать File[]
            });

            console.log('✅ Post created successfully:', result);
            toast.success('Post created successfully!');
            setIsOpen(false);
            resetForm();
            onPostCreated?.();
        } catch (error) {
            console.error('❌ Error creating post:', error);
            toast.error('Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setContent('');
        setImages([]);
        setImagePreviews([]);
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
                    <DialogDescription>
                        Share your thoughts and add images
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Post Content</Label>
                            <Textarea
                                id="content"
                                placeholder="What are you thinking about?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="resize-none"
                                rows={4}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="images">Images (up to 5)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="images"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/gif"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById('images')?.click()}
                                    className="flex items-center gap-2"
                                    disabled={isLoading}
                                >
                                    <Image className="h-4 w-4" />
                                    Add Images
                                </Button>
                            </div>

                            {imagePreviews.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-20 object-cover rounded-md"
                                            />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                                onClick={() => removeImage(index)}
                                                disabled={isLoading}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Post'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}