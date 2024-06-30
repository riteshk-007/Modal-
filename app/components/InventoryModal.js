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
import { Check, ChevronsUpDown } from "lucide-react";

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

export default function InventoryModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
      <DialogContent className="bg-white p-4 ">
        <DialogHeader>
          <DialogTitle>Check In / Check Out</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <div className="relative my-4">
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
          <div className="relative grid md:grid-cols-3 gap-4 sm:grid-cols-2 my-4">
            <Label
              className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
              htmlFor="products"
            >
              Products
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? Products.find((Product) => Product.value === value)?.label
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
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === Product.value
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
            <div className=" relative">
              <Label
                htmlFor="quantity"
                className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
              >
                Quantity
              </Label>
              <Input id="quantity" placeholder="1" className="rounded w-full" />
            </div>
            <Button className="w-full sm:col-span-2 md:col-span-1">
              Serial Number
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
