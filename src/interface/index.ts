export type SortDirection = "asc" | "desc";
export interface PendingApprovalDetailParams {
  InstanceID: string;
  ReferenceDoc: string;
  search?: string;
  isSearching: boolean;
  sortDirection?: SortDirection;
  sortField?: string;
  targetPage: number;
  pageSize: number;
  isFiltering: boolean;

  amountFrom?: string;
  amountTo?: string;
  currency?: string;

  unitPriceFrom?: string;
  unitPriceTo?: string;

  quantityFrom?: string;
  quantityTo?: string;

  unit?: string;

  TaskIndicator: string | undefined;
}

type IODataQuery = {
  $filter?: string;
  $expand?: string;
  $select?: string;
  $format?: string;
};
export type IODataEnpointConf = {
  service: string;
  entity: string;
  params?: IODataQuery;
};
