export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description?: string;
  likes: number;
  user: {
    name: string;
  };
}

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
