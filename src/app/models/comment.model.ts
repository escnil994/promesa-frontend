
interface _UserInterface {
    uid: string,
    name: string,
    image: string
}


export class Comment {

    constructor(
        public comment: string,
        public uid?: string,
        public created?: Date,
        public lastEdit?: Date,
        public user?: _UserInterface,
    ) {
    }
}