import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

export default class PdfUtil {


    public createPdf(pBody : any) : void {
        const { products } = pBody;
        const bill = new jsPDF();
        let ticketKeys : any = [];
        const ticketValues : any = [];
        let foodKeys : any = [];
        const foodValues : any = [];
        let totalAmount = 0;
        products.forEach((product : any) => {
            if(product.type === "Ticket"){
                ticketKeys = Object.keys(product);
                ticketValues.push(Object.values(product));
            }
            else{
                foodKeys = Object.keys(product);
                foodValues.push(Object.values(product));
            }
            totalAmount += parseInt(product.price);
        });
        bill.text("Facturacion de Cinepolis - Detalle:", 10, 10);
        if(ticketKeys.length !== 0){
            autoTable(bill, {
                head: [ticketKeys],
                body: ticketValues
            });
        }
        if(foodKeys.length !== 0){
            autoTable(bill, {
                head: [foodKeys],
                body: foodValues
            });
        }
        const offsetY = (ticketValues.length + foodValues.length) * 12 + 40;
        bill.text("Monto total = " + totalAmount, 10, offsetY);
        bill.text("Siempre es un placer servirle, que disfrute su pelicula.", 10, offsetY + 10);
        bill.save("factura.pdf")
    }
}