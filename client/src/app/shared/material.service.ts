

declare var M

export interface MaterialInstance {
    open(),
    close(),
    destroy()
}

export class MaterialService {
  
    static toast(message: string) {
        M.toast({ html: message })
      }

    static modal (elem: any): MaterialInstance {
        return M.Modal.init(elem, {});
    }
}