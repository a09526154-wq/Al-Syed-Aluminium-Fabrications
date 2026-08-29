import { z } from "zod";

export const QuoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z
    .string()
    .min(10, "Please provide a valid contact number (e.g., 0337 9289079)."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .optional()
    .or(z.literal("")),
  projectType: z.string().min(1, "Please select a project or service type."),
  description: z
    .string()
    .min(5, "Please provide some details or approximate dimensions."),
  location: z
    .string()
    .min(2, "Please provide your area / city (e.g., I-8, Islamabad)."),
  imageUrls: z.array(z.string()).default([]),
});

export type QuoteInput = z.infer<typeof QuoteSchema>;

export const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export const TestimonialSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters."),
  message: z.string().min(10, "Testimonial must be at least 10 characters long."),
  rating: z.number().int().min(1).max(5).default(5),
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;
