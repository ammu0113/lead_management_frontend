"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Dice from "../assests/dice.jpg";
import HeartIco from "../assests/smooth_heart.jpg";
import FileIco from "../assests/file.jpg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  linkedIn: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  visas: z
    .array(z.string())
    .min(1, { message: "Select at least one visa category" }),
  additionalInfo: z.string().optional(),
  resume: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  "United States",
  "Canada",
  "Mexico",
  "Brazil",
  "Argentina",
  "United Kingdom",
  "France",
  "Germany",
  "Spain",
  "Italy",
  "Russia",
  "China",
  "Japan",
  "South Korea",
  "India",
  "Australia",
  "New Zealand",
  "South Africa",
  "Nigeria",
  "Egypt",
];

export default function PublicLeadForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      linkedIn: "",
      visas: [],
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Create FormData for file upload
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "resume" && key !== "visas") {
        formData.append(key, value as string);
      }
    });

    // Add visa selections
    data.visas.forEach((visa) => {
      formData.append("visas", visa);
    });

    // Add resume file if exists
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      // In a real app, this would be an API call
      // await fetch('/api/leads', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to thank you page
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  {
    /* <ArrowDown size={40} strokeWidth={3} /> */
  }
  return (
    <div className="bg-white p-8 mb-16">
      <div className="flex flex-col items-center mb-8">
        <div className="p-4 rounded-full mb-0">
          <Image src={FileIco} alt="File" width={60} />
        </div>
        <h2 className="text-2xl font-bold text-center">
          Want to understand your visa options?
        </h2>
        <p className="text-center font-bold mt-2 max-w-lg">
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals.
        </p>
      </div>

      <Form {...form}>
        <div className="flex justify-center max-w-[500px] mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Country of Citizenship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LinkedIn */}
              <FormField
                control={form.control}
                name="linkedIn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="LinkedIn / Personal Website URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Visa Categories Section */}
            <div className="mt-12">
              <div className="flex flex-col items-center mb-8">
                <div className="p-4 rounded-full mb-0">
                  <Image src={Dice} alt="Dice" width={60} />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  Visa categories of interest?
                </h2>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="visas"
                  render={() => (
                    <FormItem>
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="visas"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes("O-1")}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            "O-1",
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== "O-1"
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  O-1
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="visas"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes("EB-1A")}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            "EB-1A",
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== "EB-1A"
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  EB-1A
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="visas"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes("EB-2 NIW")}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            "EB-2 NIW",
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== "EB-2 NIW"
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  EB-2 NIW
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                        <FormField
                          control={form.control}
                          name="visas"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      "I don't know"
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            "I don't know",
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== "I don't know"
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  I don't know
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="mt-12">
              <div className="flex flex-col items-center mb-8">
                <div className="p-4 rounded-full mb-0">
                  <Image src={HeartIco} alt="Heart" width={60} />
                </div>
                <h2 className="text-2xl font-bold text-center">
                  How can we help you?
                </h2>
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or OPT? Are there any timeline considerations?"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Resume Upload */}
            <div className="mt-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary/80"
                    >
                      <span>Upload your resume/CV</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, DOCX up to 10MB
                  </p>
                  {resumeFile && (
                    <p className="text-sm text-green-600 mt-2">
                      {resumeFile.name} selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </Form>
    </div>
  );
}
