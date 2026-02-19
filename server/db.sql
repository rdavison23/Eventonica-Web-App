--
-- PostgreSQL database dump
--

\restrict mh0jPpUKIP6cjXNXI0jAsRQkiQnFTmQlY0PGihG97nqW7gDihhGl9bDTOd1q7Rz

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: redu
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title text NOT NULL,
    date date NOT NULL,
    description text,
    is_favorite boolean DEFAULT false
);


ALTER TABLE public.events OWNER TO redu;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: redu
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO redu;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: redu
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: redu
--

COPY public.events (id, title, date, description, is_favorite) FROM stdin;
1	Birthday	2026-07-23	Birthday celebration!	t
2	Easter	2026-05-05	sun, Apr 5th Easter!	f
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: redu
--

SELECT pg_catalog.setval('public.events_id_seq', 2, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: redu
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict mh0jPpUKIP6cjXNXI0jAsRQkiQnFTmQlY0PGihG97nqW7gDihhGl9bDTOd1q7Rz

