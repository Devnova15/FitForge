import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Heart, MessageCircle, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

import {Post} from "@/types/post.ts";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/delete-dialog.tsx";


interface PostCardProps {
  post: Post;
  currentUserId?: string;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export default function PostCard({ 
  post, 
  currentUserId, 
  onLike, 
  onDelete 
}: PostCardProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  
  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  
  // Временно показываем кнопку ВСЕМ для тестирования
  const canDelete = true; // currentUserId && (String(post.user._id) === String(currentUserId)); 
  
  // Для отладки - выводим в консоль информацию
  console.log('PostCard Debug:', {
    currentUserId,
    postUserId: post.user._id,
    canDelete,
    postAuthor: `${post.user.firstName} ${post.user.lastName}`
  });

  const displayImages = showAllImages ? post.imageUrls : post.imageUrls.slice(0, 3);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center space-y-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.user.avatarUrl} />
          <AvatarFallback>
            {post.user.firstName[0]}{post.user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3 flex-1">
          <p className="font-medium">
            {post.user.firstName} {post.user.lastName}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
        
        {/* Показываем кнопку ВСЕМ для тестирования */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete post
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete post?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. The post will be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(post._id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        <p className="mb-4">{post.content}</p>
        
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    console.error('Image loading error:', imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ))}
            </div>
            
            {post.imageUrls.length > 3 && !showAllImages && (
              <Button
                variant="ghost"
                onClick={() => setShowAllImages(true)}
                className="mt-2 text-sm"
              >
                Show {post.imageUrls.length - 3} more images
              </Button>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-4 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post._id)}
            className={isLiked ? 'text-red-500' : ''}
          >
            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            {post.likes.length}
          </Button>
          
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            Comments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}