export interface details{
    icon: JSX.Element;
    status: string;
    totals: number;
    caption: string;
    forCssDispaly: string;
    footerCaption: string;
    btnType: string;
    data: {}[];
}

export interface upperDashboardData{
    inventory: details;
    quickReport: details;
};

export interface lowerDashboardData{
    title: string;
    side_title_link: string;
    side_title_link_caption: string;
    left_totals: number;
    left_totals_caption: string;
    right_totals: number;
    right_totals_caption: string;
    display_date_picker: boolean;
    freq_bought_item?: string;
}