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
import { useState, useEffect } from "react";
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

import { useForm, useFieldArray, Controller } from "react-hook-form";
import TableData from "./InventoryComponents/Table";

const Products = [
  { value: "product1", label: "Product 1" },
  { value: "product2", label: "Product 2" },
  { value: "product3", label: "Product 3" },
  { value: "product4", label: "Product 4" },
  { value: "product5", label: "Product 5" },
];

const Reasons = [
  { value: "reason1", label: "Reason 1" },
  { value: "reason2", label: "Reason 2" },
  { value: "reason3", label: "Reason 3" },
  { value: "reason4", label: "Reason 4" },
  { value: "reason5", label: "Reason 5" },
];

export default function InventoryModal() {
  const [open3, setOpen3] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSerial, setCurrentSerial] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      admin: "",
      products: [
        { product: "", quantity: "", isSelected: false },
        { product: "", quantity: "", isSelected: true },
      ],
      usage: "",
      reason: "",
      description: "",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data) => {
    const newData = data.products.flatMap((item) => {
      const quantity = parseInt(item.quantity, 10);
      return Array(quantity)
        .fill()
        .map(() => ({
          ...data,
          serialNumber: generateSerialNumber(),
          products: [
            { product: item.product, quantity: 1, isSelected: item.isSelected },
          ],
        }));
    });
    setSavedData([...savedData, ...newData]);
    reset();
    setIsEditing(false);
    setCurrentSerial(null);
  };

  const handleSave = () => {
    const updatedData = savedData.map((item) =>
      item.serialNumber === currentSerial ? { ...item, ...getValues() } : item
    );
    setSavedData(updatedData);
    reset();
    setIsEditing(false);
    setCurrentSerial(null);
  };

  const generateSerialNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSerialNumberSelect = (serialNumber) => {
    const selectedData = savedData.find(
      (item) => item.serialNumber === serialNumber
    );
    if (selectedData) {
      Object.entries(selectedData).forEach(([key, value]) => {
        if (key === "products") {
          setValue("products", value);
        } else {
          setValue(key, value);
        }
      });
      setIsEditing(true);
      setCurrentSerial(serialNumber);
    }
  };

  const handleDeleteAll = () => {
    setSavedData([]);
    setIsEditing(false);
    setCurrentSerial(null);
    reset();
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
          <div className="flex items-center justify-center md:flex-row flex-col ">
            <div className="my-2 md:my-[14px] w-full md:w-9/12  md:p-2">
              {/* Admin /Id  Input */}
              <div className="relative my-2 md:my-[14px] flex-col flex">
                <Label
                  className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                  htmlFor="admin"
                >
                  Admin /ID
                </Label>
                <Controller
                  name="admin"
                  control={control}
                  rules={{ required: "Admin ID is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="admin"
                      placeholder="#ADFTXWQOBF"
                      className="rounded w-full"
                    />
                  )}
                />
                {errors.admin && (
                  <span className="text-red-500 text-xs">
                    {errors.admin.message}
                  </span>
                )}
              </div>
              {/* Dynamic Products Inputs */}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={`relative grid md:grid-cols-3 gap-4 sm:grid-cols-2 my-2 md:my-[14px] ${
                    field.isSelected ? "editable" : ""
                  }`}
                >
                  {index === 0 && (
                    <Label
                      className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                      htmlFor="products"
                    >
                      Products
                    </Label>
                  )}
                  <div>
                    <Controller
                      name={`products.${index}.product`}
                      control={control}
                      rules={{ required: "Product is required" }}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              {field.value
                                ? Products.find(
                                    (product) => product.value === field.value
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
                                  {Products.map((product) => (
                                    <CommandItem
                                      key={product.value}
                                      value={product.value}
                                      onSelect={() => {
                                        field.onChange(product.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === product.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {product.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.products?.[index]?.product && (
                      <span className="text-red-500 text-xs">
                        {errors.products[index].product.message}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Label
                      htmlFor={`quantity-${field.id}`}
                      className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                    >
                      Quantity
                    </Label>
                    <Controller
                      name={`products.${index}.quantity`}
                      control={control}
                      rules={{
                        required: "Quantity is required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Must be a number",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id={`quantity-${field.id}`}
                          placeholder="10"
                          className="rounded w-full"
                        />
                      )}
                    />
                    {errors.products?.[index]?.quantity && (
                      <span className="text-red-500 text-xs">
                        {errors.products[index].quantity.message}
                      </span>
                    )}
                  </div>
                  <Controller
                    name={`products.${index}.isSelected`}
                    control={control}
                    render={({ field }) => (
                      <Button
                        className="w-full sm:col-span-2 md:col-span-1"
                        variant={field.value ? "default" : "outline"}
                        onClick={() => field.onChange(!field.value)}
                        type="button"
                      >
                        {field.value ? "Selected" : "Serial Number"}
                      </Button>
                    )}
                  />
                </div>
              ))}
              {/*  Add more button */}
              <Button
                size="sm"
                variant="outline"
                className="gap-1 w-full bg-gray-100"
                onClick={() =>
                  append({ product: "", quantity: "", isSelected: false })
                }
                type="button"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Variant
              </Button>
              {/* Usage inputs */}
              <div className="relative grid md:grid-cols-2 gap-4  my-2 md:my-[14px]">
                <div className="relative">
                  <Label
                    className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                    htmlFor="usage"
                  >
                    Usage
                  </Label>
                  <Controller
                    name="usage"
                    control={control}
                    rules={{ required: "Usage is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="usage"
                        placeholder="In Milk Analysis"
                        className="rounded w-full"
                      />
                    )}
                  />
                  {errors.usage && (
                    <span className="text-red-500 text-xs">
                      {errors.usage.message}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Label
                    className="absolute -top-2 left-2 bg-white rounded px-1 text-xs text-gray-500"
                    htmlFor="reason"
                  >
                    Reason
                  </Label>
                  <Controller
                    name="reason"
                    control={control}
                    rules={{ required: "Reason is required" }}
                    render={({ field }) => (
                      <Popover open={open3} onOpenChange={setOpen3}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open3}
                            className="w-full justify-between"
                          >
                            {field.value
                              ? Reasons.find(
                                  (reason) => reason.value === field.value
                                )?.label
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
                                {Reasons.map((reason) => (
                                  <CommandItem
                                    key={reason.value}
                                    value={reason.value}
                                    onSelect={() => {
                                      field.onChange(reason.value);
                                      setOpen3(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === reason.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {reason.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.reason && (
                    <span className="text-red-500 text-xs">
                      {errors.reason.message}
                    </span>
                  )}
                </div>
              </div>
              {/* Description */}
              <div className="relative my-2 md:my-[14px] flex-col flex">
                <Label className="text-gray-500 text-sm" htmlFor="description">
                  Description
                </Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Type your message here."
                    />
                  )}
                />
              </div>
            </div>
            {savedData.length > 0 && (
              <div className="w-full md:w-1/4 h-full">
                <div className="flex w-full h-full justify-between items-center">
                  <h2 className="text-xs font-bold text-gray-600">
                    Serial Number of Motor PCB
                  </h2>
                  <div className="flex items-center justify-between gap-2">
                    <Button variant="default" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDeleteAll}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <TableData
                  data={savedData}
                  onSelect={handleSerialNumberSelect}
                />
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-end">
            {isEditing ? (
              <Button
                className="cursor-pointer md:w-1/4"
                onClick={handleSave}
                type="button"
              >
                Save
              </Button>
            ) : (
              <Button className="cursor-pointer md:w-1/4" type="submit">
                Check In
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
