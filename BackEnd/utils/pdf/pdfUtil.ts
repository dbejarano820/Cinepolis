import { jsPDF } from "jspdf";

export default class PdfUtil {


    public createPdf(pBody : any) : void {
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("test.pdf")
    }
}