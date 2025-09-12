import CampaignForm from '@/components/campaign/CampaignForm';
import Header from '@/components/common/layout/Header';

export default function CampaignPage() {
  return (
    <div className="flex min-h-screen">      
      <div className="flex-1 p-6">
        <Header />
        <CampaignForm />
      </div>
    </div>
  );
}
