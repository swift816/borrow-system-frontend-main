export interface Item {
    _id: string;
    serialNo: string;
    equipmentType: object;
    name: string;
    brand: object;
    color: string;
    modelNo: string;
    quantity: number;
    unit: string;
    matter: string;
    description: string;
    status: string;
    dateAcquired: Date;
    images: {
        thumbnailUrl: string,
        midSizeUrl: string,
        Url: string,
    };
    remarks: string;
    tags: boolean;
    checkedBy: string;
    department: number;
    disp: boolean;
}
