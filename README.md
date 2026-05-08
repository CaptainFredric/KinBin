# CareBinder (KinBin)

CareBinder is a private family caregiving command center focused on practical coordination: appointments, medications, daily notes, tasks, document metadata, and printable handoff packets.

## Disclaimer

CareBinder is a family organization tool. It does not provide medical advice, diagnosis, treatment guidance, emergency monitoring, or professional care documentation. Always verify medication and care decisions with licensed professionals.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Zod + React Hook Form
- jsPDF for handoff packet export
- Local demo mode using `localStorage`
- Supabase-ready schema and env placeholders

## Pages

- `/` landing page
- `/pricing`
- `/demo`
- `/login`
- `/signup`
- `/dashboard`
- `/binders/new`
- `/binders/[id]`
- `/binders/[id]/notes`
- `/binders/[id]/medications`
- `/binders/[id]/appointments`
- `/binders/[id]/tasks`
- `/binders/[id]/documents`
- `/binders/[id]/handoff`
- `/settings`

## Local setup

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

## Demo mode

- Works without Supabase.
- Automatically seeds a realistic sample binder in browser storage.
- Supports create/edit/delete for profile, notes, medications, appointments, tasks, and document metadata.
- Supports handoff packet print and PDF export.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run check`

## Roadmap

- Supabase auth + multi-user sharing
- Storage-backed document uploads
- Role permissions and invite flow
- Stripe billing integration
- Expanded handoff packet templates
