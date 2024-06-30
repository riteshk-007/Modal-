"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  ArrowDownUp,
  Check,
  ChevronsUpDown,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableHeader,
} from "@/components/ui/table";

const Products = [
  {
    value: "product1",
    label: "Product 1",
  },
  {
    value: "product2",
    label: "Product 2",
  },
  {
    value: "product3",
    label: "Product 3",
  },
  {
    value: "product4",
    label: "Product 4",
  },
  {
    value: "product5",
    label: "Product 5",
  },
];

const invoices = [
  { goods: "Serial123" },
  { goods: "Serial456" },
  { goods: "Serial789" },
];
const Reasons = [
  {
    value: "reason1",
    label: "Reason 1",
  },
  {
    value: "reason2",
    label: "Reason 2",
  },
  {
    value: "reason3",
    label: "Reason 3",
  },
  {
    value: "reason4",
    label: "Reason 4",
  },
  {
    value: "reason5",
    label: "Reason 5",
  },
];
export default function InventoryModal() {
  const [productInputs, setProductInputs] = useState([
    { id: 1, open: false, value: "", quantity: "", isSelected: false },
    { id: 2, open: false, value: "", quantity: "", isSelected: true },
  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState("");

  const addProductInput = () => {
    setProductInputs([
      ...productInputs,
      {
        id: Date.now(),
        open: false,
        value: "",
        quantity: "",
        isSelected: false,
      },
    ]);
  };

  const updateProductInput = (id, field, value) => {
    setProductInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, [field]: value } : input
      )
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
        border-blue-600
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:bg-blue-700"
        >
          Manage Inventory
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-4" aria-describedby="description">
        <DialogHeader>
          <DialogTitle>Check In / Check Out</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center md:flex-row flex-col ">
          <div className="my-2 md:my-4 w-full md:w-9/12  md:p-5">
            {/* Admin /Id  Input */}
            <div className="relative my-2 md:my-4">
              <Label
                className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                htmlFor="admin"
              >
                Admin /ID
              </Label>
              <Input
                id="admin"
                placeholder="#ADFTXWQOBF"
                className="rounded w-full"
              />
            </div>
            {/* Dynamic Products Inputs */}
            {productInputs.map((input, index) => (
              <div
                key={input.id}
                className="relative grid md:grid-cols-3 gap-4 sm:grid-cols-2 my-2 md:my-4"
              >
                {index === 0 && (
                  <Label
                    className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                    htmlFor="products"
                  >
                    Products
                  </Label>
                )}
                <Popover
                  open={input.open}
                  onOpenChange={(open) =>
                    updateProductInput(input.id, "open", open)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={input.open}
                      className="w-full justify-between"
                    >
                      {input.value
                        ? Products.find(
                            (Product) => Product.value === input.value
                          )?.label
                        : "Select Product..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Product..." />
                      <CommandList>
                        <CommandEmpty>No Product found.</CommandEmpty>
                        <CommandGroup>
                          {Products.map((Product) => (
                            <CommandItem
                              key={Product.value}
                              value={Product.value}
                              onSelect={(currentValue) => {
                                updateProductInput(
                                  input.id,
                                  "value",
                                  currentValue === input.value
                                    ? ""
                                    : currentValue
                                );
                                updateProductInput(input.id, "open", false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  input.value === Product.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {Product.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div className="relative">
                  <Label
                    htmlFor={`quantity-${input.id}`}
                    className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                  >
                    Quantity
                  </Label>
                  <Input
                    id={`quantity-${input.id}`}
                    placeholder="10"
                    className="rounded w-full"
                    value={input.quantity}
                    onChange={(e) =>
                      updateProductInput(input.id, "quantity", e.target.value)
                    }
                  />
                </div>
                <Button
                  className="w-full sm:col-span-2 md:col-span-1"
                  variant={input.isSelected ? "default" : "outline"}
                  onClick={() =>
                    updateProductInput(
                      input.id,
                      "isSelected",
                      !input.isSelected
                    )
                  }
                >
                  {input.isSelected ? "Selected" : "Serial Number"}
                </Button>
              </div>
            ))}
            {/*  Add more button */}
            <Button
              size="sm"
              variant="outline"
              className="gap-1 w-full bg-gray-100"
              onClick={addProductInput}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
            {/* Usage inputs  third*/}
            <div className="relative grid md:grid-cols-2 gap-4  my-2 md:my-4">
              <div className="relative">
                <Label
                  className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                  htmlFor="usage"
                >
                  Usage
                </Label>
                <Input
                  id="usage"
                  placeholder="In Milk Analysis"
                  className="rounded w-full"
                />
              </div>
              <div className="relative">
                <Label
                  className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                  htmlFor="reason"
                >
                  Reason
                </Label>
                <Popover open={open3} onOpenChange={setOpen3}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open3}
                      className="w-full justify-between"
                    >
                      {value3
                        ? Reasons.find((Reason) => Reason.value === value3)
                            ?.label
                        : "Select Reason..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Reason..." />
                      <CommandList>
                        <CommandEmpty>No Reason found.</CommandEmpty>
                        <CommandGroup>
                          {Reasons.map((Reason) => (
                            <CommandItem
                              key={Reason.value}
                              value={Reason.value}
                              onSelect={(currentValue) => {
                                setValue3(
                                  currentValue === value3 ? "" : currentValue
                                );
                                setOpen3(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value3 === Reason.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {Reason.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Description */}
            <div className="relative my-2 md:my-4">
              <Label className="text-gray-500 text-sm" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Type your message here.  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem repellendus expedita facere cum. Saepe, quidem! Nihil facilis."
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 h-full">
            <div className="flex w-full justify-between items-center">
              <h2 className="text-xs font-bold text-gray-600">
                Serial Number of Motor PCB
              </h2>
              <div className="flex items-center justify-between gap-2">
                <Button variant="default" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="w-full border my-2 h-[80%] overflow-hidden overflow-y-auto rounded custom-scrollbar">
              <Table>
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
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <Button className="cursor-pointer md:w-1/4 ">Check In</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
