import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableData = ({ data, onSelect }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Serial Number</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            onClick={() => onSelect(item.serialNumber)}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell className="font-medium">{item.serialNumber}</TableCell>
            <TableCell>{item.products[0].product}</TableCell>
            <TableCell>{item.products[0].quantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableData;
