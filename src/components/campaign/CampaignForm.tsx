'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Swal from 'sweetalert2';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import StyledRichTextEditor from '@/components/common/StyledRichTextEditor';
import { sendCampaignEmail } from '@/lib/api/campaign.api';
import { SendCampaignEmailDTO } from 'common/module/campaign/campaign.dto';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useInputField } from 'common/hooks';
import EmailTagsInput from '../EmailTagsInput';


export default function CampaignForm() {
  const [campaignName, setCampaignName] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [subject, setSubject] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [body, setBody] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  // const [emails, setEmails] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null)
  const [errorText, setErrorText] = useState({
		emailError: '',
	});
  console.log('on going')

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

    try{
      // const payload: SendCampaignEmailDTO = {
      //   campaignName: 'Campaign from client',
      //   subject: 'Join client campaign 1',
      //   body: "Hi. Let's introduce",
      //   emails: ["toofloksong@gmail.com"]
      // }
      // const emailList = emails
      //   .split(',')
      //   .map((e) => e.trim())
      //   .filter((e) => e.length > 0);

      // if (emailList.length === 0) {
      //   Swal.fire('Error', 'Please enter at least one email', 'error');
      //   return;
      // }

      const payload: SendCampaignEmailDTO = {
        campaignName,
        subject,
        body,
        emails: emails,
      };

      await sendCampaignEmail(payload)
      Swal.fire('Success', 'Email sent successfully', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Failed to send email', 'error');
    }
		// if (email === '') {
		// 	// setErrorText((prevErrorText) => ({
		// 	// 	...prevErrorText,
		// 	// 	emailError: dict.registerPage.errorValidation.email,
		// 	// }));
		// } else {
		// 	// setIsLoading(true);
		// 	try {
		// 		// await fetchForgotPassword({ email });
			
		// 	} catch (error) {
		// 		// setErrorText((prevErrorText) => ({
		// 		// 	...prevErrorText,
		// 		// 	emailError: dict.registerPage.errorValidation.email,
		// 		// }));
		// 	}
		
	}



  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="campaign_name" className="block text-sm/6 font-medium text-black">campaign Name</label>        
        <StyledInput id="campaign_name" value={campaignName} setValue={setCampaignName}  placeholder="New Campaign!" 
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></StyledInput>
      <label htmlFor="subject" className="block text-sm/6 font-medium text-black">subject</label>        
        <StyledInput id="subject" value={subject} setValue={setSubject} 
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="join us! new campaign!" ></StyledInput>
      <label htmlFor="emails" className="block text-sm/6 font-medium text-black">emails</label>        
      <EmailTagsInput emails={emails} setEmails={setEmails} />
        {/* <StyledInput
          id="emails"
          value={emails}
          setValue={setEmails}
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Emails (comma separated)"
        /> */}
        <StyledInput value={body} setValue={setBody} 
        appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..." ></StyledInput>

        <StyledButton  type='submit' appendClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> submit </StyledButton>
      </form>
    </div>
  );
}
