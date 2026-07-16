import Breadcrumb from "./_components/Breadcrumb";
import LoginForm from "./_components/LoginFrom";
import Newsletter from "./_components/Newsletter";

export default function LoginPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb />
      <LoginForm />
      <Newsletter />
    </div>
  );
}
