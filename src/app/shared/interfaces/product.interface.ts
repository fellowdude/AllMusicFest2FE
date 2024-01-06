export interface IProduct {
    prd_id: number;
    prd_code: string;
    prd_name: string;
    prd_detail: string[];
    prd_ogprice: number;
    prd_price: number;
    prd_crtdate: Date;
    prd_upddate: Date;
    prd_active: boolean;
    prd_highlight: boolean;
}