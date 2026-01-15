-- Migration: Add email_logs table to track sent emails
-- This table helps prevent duplicate sends and provides audit trail

CREATE TABLE IF NOT EXISTS public.email_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid,
  email_to text NOT NULL,
  email_type text NOT NULL DEFAULT 'order_confirmation',
  status text NOT NULL DEFAULT 'sent', -- 'sent', 'failed'
  error_message text,
  sent_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT email_logs_pkey PRIMARY KEY (id),
  CONSTRAINT email_logs_order_id_fkey FOREIGN KEY (order_id) 
    REFERENCES public.orders(id) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_logs_order_id ON public.email_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_sent_at ON public.email_logs(sent_at DESC);

-- Add comment
COMMENT ON TABLE public.email_logs IS 'Tracks all emails sent by the system for audit and debugging';
