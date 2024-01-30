export interface BottomSummaryCardValueProps{
        title: string;
        side_title_link: string;
        side_title_link_caption: string;
        left_totals: number;
        left_totals_caption: string;
        right_totals: number;
        right_totals_caption: string;
        freq_bought_item?: string;
        display_date_picker: boolean;
}
export interface TopSummaryCardProps{
    key: number,
    data: {
        icon: React.ReactNode;
        totals: number; 
        caption: string;
        forCssDispaly:string;
        footerCaption: string;
        status: string;
        btnType: string;
        data: {}[]
    }
}
export interface BottomSummaryCardProps{
    inventory: BottomSummaryCardValueProps;
    quickReport: BottomSummaryCardValueProps;
}
