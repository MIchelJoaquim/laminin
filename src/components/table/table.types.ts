export interface HeadCell {
    id: string;
    label: string;
}
export interface TableProps {
    headCells: HeadCell[];
    rows: Record<string, unknown>[] | null;
}