'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clone } from 'lodash';
import Swal from 'sweetalert2';
import StyledInput from '@/components/common/StyledInput';
import StyledButton from '@/components/common/StyledButton';
import StyledRichTextEditor from '@/components/common/StyledRichTextEditor';
import { sendCampaignEmail } from '@/lib/api/campaign.api';
import { SendCampaignEmailDTO } from 'common/module/campaign/campaign.dto';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useInputField } from 'common/hooks';
import EmailTagsInput from '../EmailTagsInput';
import { editorBodyToBackend } from '@/lib/utils';


export default function CampaignForm() {
  const [campaignName, setCampaignName] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [subject, setSubject] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  // const [body, setBody] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [body, setBody] = useState<string>('');
  // const [emails, setEmails] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [errorText, setErrorText] = useState({
    campaignNameError: '',
		emailError: '',
    subjectError: '',
    bodyError: '',
	});  

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault(); 
    setErrorText({
      campaignNameError: '',
      emailError: '',
      subjectError: '',
      bodyError: '',
    });   
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    const invalidEmails = emails.filter((email) => !emailRegex.test(email));
  
    if (invalidEmails.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Emails',
        html: `
          <p>The following emails are invalid format:</p>
          <ul class="text-left mt-2">
            ${invalidEmails.map((email) => `<li>• ${email}</li>`).join('')}
          </ul>
        `,
      });
      return;
    }
    const _errorText = clone(errorText);
    _errorText.campaignNameError = !campaignName ? 'this field required' : ''
    _errorText.subjectError =  !subject ? 'this field required' : ''
    _errorText.emailError =  emails.length==0 ? 'email cannot be empty' : ''
    setErrorText(_errorText)
    const isNotError = Object.values(_errorText).every((error) => error === '');
		if (isNotError) {    
      try{        
        const payload: SendCampaignEmailDTO = {
          campaignName,
          subject,
          body: backendBody,
          emails: emails,
        };
        await sendCampaignEmail(payload)
        Swal.fire('Success', 'Email sent successfully', 'success');
      } catch (err: any) {
        Swal.fire('Error', err.message || 'Failed to send email', 'error');
      }
    } else{
      const errorsList = Object.entries(_errorText)
        .filter(([_, msg]) => msg) // keep only fields with errors
        .map(([key, msg]) => {
          // make key more readable (remove "Error" and capitalize)
          const label = key.replace(/Error$/, '');
          const prettyLabel = label.charAt(0).toUpperCase() + label.slice(1);
          return `<li>• ${prettyLabel}: ${msg}</li>`;
        })
        .join('');

      Swal.fire({
        icon: 'error',
        title: 'Validation Failed',
        html: `          
          <ul class="text-left mt-2">
            ${errorsList}
          </ul>
        `,
      });
        console.log(_errorText)
    }
  }


  const backendBody = editorBodyToBackend(body);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        
        <label htmlFor="campaign_name" className="block text-sm/6 font-medium text-black">campaign Name</label>        
        <StyledInput id="campaign_name" error={!!errorText.campaignNameError} errorText={errorText.campaignNameError} value={campaignName} setValue={setCampaignName}  placeholder="New Campaign!" 
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></StyledInput>
        
        <label htmlFor="subject" className="block text-sm/6 font-medium text-black">subject</label>        
        <StyledInput error={!!errorText.subjectError} errorText={errorText.subjectError} id="subject" value={subject} setValue={setSubject} 
          appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 p-b-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="join us! new campaign!" ></StyledInput>

        <label htmlFor="emails" className="block text-sm/6 font-medium text-black">emails</label>        
        <EmailTagsInput  emails={emails} setEmails={setEmails} errorText={errorText.emailError} />       
        

        {/* <StyledInput value={body} setValue={setBody} 
        appendClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="..." ></StyledInput> */}
        <label htmlFor="body" className="block text-sm font-medium text-black mt-4">
          Body
        </label>
        <StyledRichTextEditor
          value={body}
          onChange={setBody}
          // placeholder="Write your email content..."
        />
        {errorText.bodyError && <label className="text-red-800 text-sm">{errorText.bodyError}</label>}


        <StyledButton  type='submit' appendClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> submit </StyledButton>
      </form>
    </div>
  );
}
