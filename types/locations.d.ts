export type Location = {
    id: string;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }
}

export type LocationsFindResponse = {
    data: Location[];
}