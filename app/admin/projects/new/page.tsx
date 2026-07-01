import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <p className="eyebrow mb-1">Projects</p>
      <h2 className="mb-8 font-display text-2xl font-semibold text-ink">New Project</h2>
      <ProjectForm />
    </div>
  );
}
