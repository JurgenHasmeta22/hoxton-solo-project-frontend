export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  countSubscribers?: number;
  description?: string;
  avatar?: any;
  videos?: any;
  savedVideos?: any;
  videosLiked?: any;
  videosDisliked?: any;
  commentsLiked?: any;
  commentsDisliked?: any;
};
export type Video = {
  id?: number;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  src: string;
  userId: number;
  countLikesInside?: number;
  countDislikesInside?: number;
  countCommentsInside?: number;
  userWhoCreatedIt: User;
  comments: any;
  views: number;
  hashtags: any;
  usersWhoLikedIt: any;
  usersWhoDislikedIt: any;
  category: any;
};
export type Category = {
  id?: number;
  name: string;
};
