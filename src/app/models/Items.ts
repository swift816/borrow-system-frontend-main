export interface Item {
    serialNo: String;
    equipmentType: Object;
    name: String;
    brand: Object;
    color: String;
    modelNo: String;
    quantity: Number;
    unit: String;
    matter: String;
    description: String;
    status: String;
    dateAcquired: Date;
    images: {
        thumbnailUrl: String,
        midSizeUrl: String,
        Url: String,
    };
    remarks: String;
    tags: Boolean;
    checkedBy: String;
    department: Number;
    disp: Boolean;
}