import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Table,
    TableHeader,
  } from "@/components/ui/table";
import { ArrowDownUp } from "lucide-react";

  const invoices = [
      { goods: "Serial123" },
      { goods: "Serial456" },
      { goods: "Serial789" },
    ];
const TableData = () => {
  return (
     <div className="w-full border my-2 md:h-96 overflow-hidden overflow-y-auto rounded custom-scrollbar">
     <Table className="h-full">
       <TableHeader>
         <TableRow className="text-xs font-semibold">
           <TableHead className="w-full">#</TableHead>
           <TableHead>Serial Number</TableHead>
           <TableHead>
             <ArrowDownUp className="h-4 w-4" />
           </TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
         {invoices.map((invoice, i) => (
           <TableRow key={i} className="text-xs">
             <TableCell className="font-medium">{i + 1}</TableCell>
             <TableCell>{invoice.goods}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </div>
  )
}

export default TableData
