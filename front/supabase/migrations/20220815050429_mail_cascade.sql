ALTER TABLE IF EXISTS public.mail
    ADD CONSTRAINT mail_address_id_fkey FOREIGN KEY (address_id)
    REFERENCES public.profiles (id) MATCH SIMPLE
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.mail
    ADD CONSTRAINT mail_sender_id_fkey FOREIGN KEY (sender_id)
    REFERENCES public.profiles (id) MATCH SIMPLE
    ON DELETE CASCADE;

ALTER TABLE IF EXISTS public.mail
    ADD CONSTRAINT mail_organization_id_fkey FOREIGN KEY (organization_id)
    REFERENCES public.organizations (id) MATCH SIMPLE
    ON DELETE CASCADE;
