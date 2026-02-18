export type UUID = string;

export type Brand = {
  id: UUID;
  name: string;
};

export type Category = {
  id: UUID;
  name: string;
};

export type InventoryBatch = {
  id: UUID;
  batchNumber: string;
  expirationDate: string;
  quantity: number;
};

export type Drug = {
  id: UUID;
  drugName: string;
  basePrice: string;
  brand: Brand;
  category: Category;
  batches: InventoryBatch[];
};

export type InventoryListItem = Drug & {
  totalQuantity: number;
};

export type InventoryListResponse = {
  page: number;
  limit: number;
  total: number;
  data: InventoryListItem[];
};

export type BulkUploadMode = "set" | "increment";

export type BulkUploadResponse = {
  processed: number;
  mode: BulkUploadMode;
};

export type InventoryListParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  expirationAfter?: string;
  expirationBefore?: string;
};
