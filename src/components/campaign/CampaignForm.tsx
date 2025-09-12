'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Swal from 'sweetalert2';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import StyledRichTextEditor from '@/components/common/StyledRichTextEditor';
import { sendCampaignEmail, SendCampaignDto } from '@/lib/api/campaign.api';

const schema = z.object({
  campaignName: z.string().nonempty(),
  subject: z.string().nonempty(),
  body: z.string().nonempty(),
  emails: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

export default function CampaignForm() {
  const { register, handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const emailsArray = data.emails.split(',').map((e) => e.trim());
      await sendCampaignEmail({ ...data, emails: emailsArray });
      Swal.fire('Success', 'Email sent successfully', 'success');
      reset();
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Failed to send email', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <StyledInput {...register('campaignName')} placeholder="Campaign Name" />
      <StyledInput {...register('subject')} placeholder="Subject" />
      <Controller
        name="body"
        control={control}
        render={({ field }) => <StyledRichTextEditor value={field.value || ''} setValue={field.onChange} />}
      />
      <StyledInput {...register('emails')} placeholder="Emails (comma separated)" />
      <StyledButton type="submit">Send Email</StyledButton>
    </form>
  );
}
