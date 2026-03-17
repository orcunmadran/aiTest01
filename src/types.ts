export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export type Category = 'Tümü' | 'Siyaset' | 'Teknoloji' | 'Spor' | 'Ekonomi' | 'Kültür';
