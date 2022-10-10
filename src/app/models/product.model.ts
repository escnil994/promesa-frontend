
interface _UserInterface {
    uid: string,
    name: string,
    image: string
}

interface _CategoryInterface {
    uid: string,
    name: string,
    image: string
}

export class Product {

    constructor(
        public name: string,
        public description: string,
        public price: number,
        public status: boolean,
        public code: string,
        public discount?: number,
        public details?: string,
        public image?: string,
        public image_1?: string,
        public image_2?: string,
        public image_3?: string,
        public image_4?: string,
        public user?: _UserInterface,
        public category?: _CategoryInterface,
        public uid?: string,
    ) {
    }
}