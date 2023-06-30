

CREATE TABLE IF NOT EXISTS public.profile(
  id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  email character varying COLLATE pg_catalog."default",
  role character varying COLLATE pg_catalog."default" DEFAULT 'free'::character varying,
  is_terms_agre boolean DEFAULT false,
  stripe_customer_id character varying COLLATE pg_catalog."default",
  CONSTRAINT profile_pkey PRIMARY KEY (id),
  CONSTRAINT profile_id_fkey FOREIGN KEY (id)
    REFERENCES auth.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

CREATE POLICY "Enable update access for user that is authenticated"
ON public.profile
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING ((auth.uid() = id))
WITH CHECK ((auth.uid() = id));

CREATE OR REPLACE FUNCTION public.create_user_profile_function()
RETURNS trigger
LANGUAGE 'plpgsql'
COST 100
VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
begin
insert into public.profile(id, email)
values(new.id, new.email);

return new;
end;
$BODY$;


