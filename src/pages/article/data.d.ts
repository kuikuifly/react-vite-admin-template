export interface TableListQueryParams {
  curPage: number;
  pageSize: number;
}

export interface PaginationConfig {
  totalRows?: number;
  current?: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

export interface TableListItem {
  id: number;
  articleType: string;
  author: string;
  content: string;
  title: string;
}

export interface IResponseData {
  list: TableListItem[];
  total: number;
}

export interface DetailData {
  // 1.articleType
  // 2.author
  // 3.content
  // 4.returnErrCode
  // 5.returnErrMsg
  // 6.returnSuccess
  // 7.title
}
