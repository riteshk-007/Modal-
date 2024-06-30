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
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

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
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState("");
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState("");

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
          {/* Admin /Id  Input */}
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
          {/* Products Input first */}
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
              <Input
                id="quantity"
                placeholder="10"
                className="rounded w-full"
              />
            </div>
            <Button className="w-full sm:col-span-2 md:col-span-1">
              Serial Number
            </Button>
          </div>
          {/* Products Input second */}
          <div className="relative grid md:grid-cols-3 gap-4 sm:grid-cols-2 my-4">
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className="w-full justify-between"
                >
                  {value2
                    ? Products.find((Product) => Product.value === value2)
                        ?.label
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
                            setValue2(
                              currentValue === value2 ? "" : currentValue
                            );
                            setOpen2(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value2 === Product.value
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
              <Input
                id="quantity2"
                placeholder="10"
                className="rounded w-full"
              />
            </div>
            <Button
              variant="outline"
              className="w-full sm:col-span-2 md:col-span-1 bg-gray-100"
            >
              Selected
            </Button>
          </div>
          {/*  Add more button */}
          <Button
            size="sm"
            variant="outline"
            className="gap-1 w-full bg-gray-100"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Variant
          </Button>
          {/* Usage inputs */}
          <div className="relative grid md:grid-cols-2 gap-4  my-4">
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

            <Popover open={open3} onOpenChange={setOpen3}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open3}
                  className="w-full justify-between"
                >
                  {value3
                    ? Products.find((Product) => Product.value === value3)
                        ?.label
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
                            setValue3(
                              currentValue === value3 ? "" : currentValue
                            );
                            setOpen3(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value3 === Product.value
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
