export type AdvisoryResponse = {
  data: string | null;
  error: string | null;
};

// FIX: Add Advisory type definition for AdvisoryCard component
export type Advisory = {
  isUser: boolean;
  query: string;
  response?: string | null;
  imageUrl?: string | null;
  isLoading?: boolean;
};
