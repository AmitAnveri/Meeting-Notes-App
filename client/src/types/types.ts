// types.ts
export interface ActionItem {
    _id?: string;
    task: string;
    done: boolean;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    actionItems: ActionItem[];
    date: string;
    isEditing?: boolean; // Optional property to manage edit state
}
