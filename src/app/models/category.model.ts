
interface _CategoryUserInterface {
    uid: string,
    name: string,
    image: string,
}

export class Category {

    constructor(
        public name: string,
        public description: string,
        public details?: string,
        public uid?: string,
        public image?: string,
        public user?: _CategoryUserInterface,
        public code?: string
    ) {
    }
}