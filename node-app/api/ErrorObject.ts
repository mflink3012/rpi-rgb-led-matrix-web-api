export class ErrorObject extends Object {
    time: string;
    code: string;
    stub: string;
    params: Object;
    message: string;

    constructor(code: string, stub: string, params: Object = {}) {
        super();
        Object.setPrototypeOf(this, ErrorObject.prototype);

        this.time = new Date().toISOString();
        this.code = code;
        this.stub = stub;
        this.params = params;
        this.message = this.create_message_from_stub(stub, params);
    }

    protected create_message_from_stub(stub: string, params: Object): string {
        let message = stub;

        if (params !== null) {
            Object.keys(params).forEach(key => {
                message = message.replace(`(${key})`, params[key]);
            });
        }

        return message;
    }
}
;
