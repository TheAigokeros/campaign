'use client';
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
import Image from "next/image"

export default function CampaignForm() {
  const [campaignName, setCampaignName] = useInputField<string, ChangeEvent<HTMLInputElement>>('');
  const [subject, setSubject] = useInputField<string, ChangeEvent<HTMLInputElement>>('');  
  const [body, setBody] = useState<string>('');  
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
    _errorText.campaignNameError = !campaignName ? '*this field required' : ''
    _errorText.subjectError =  !subject ? '*this field required' : ''
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
        .filter(([_, msg]) => msg)
        .map(([key, msg]) => {          
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

     
      <h1 className="mb-4 content-center justify-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 block">Campaign Mailer <Image
        src="/img/email_2052763.png"
        className="absolute"        
        width={50}
        height={50}
        alt="Picture of the author"
      /></span> Scalable AI.
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col gap-y-3">
          <div>
            <label htmlFor="campaign_name" className="block text-sm/6 font-medium text-black">campaign Name</label>        
            <StyledInput id="campaign_name" error={!!errorText.campaignNameError} errorText={errorText.campaignNameError} value={campaignName} setValue={setCampaignName}  placeholder="New Campaign!" 
              appendClassName="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" ></StyledInput>
          </div>
        
          <div>          
            <label htmlFor="subject" className="block text-sm/6 font-medium text-black">subject</label>        
            <StyledInput error={!!errorText.subjectError} errorText={errorText.subjectError} id="subject" value={subject} setValue={setSubject} 
              appendClassName="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="join us! new campaign!" ></StyledInput>
          </div>

          <div>
            <label htmlFor="emails" className="block text-sm/6 font-medium text-black">emails</label>        
            <div className="flex flex-row gap-x-1 relative">

              <EmailTagsInput  emails={emails} setEmails={setEmails} />       
              <button type="button" className="text-white bg-blue-700  font-medium rounded-lg text-medium px-5 py-2.5 me-2 dark:bg-gray-500  flex-1 m-0 disabled:">upload</button>
            </div>
          </div>
                  
          <div>
            <StyledRichTextEditor
              value={body}
              onChange={setBody}        
            />
          </div>                
        </div>
        {errorText.bodyError && <label className="text-red-800 text-sm">{errorText.bodyError}</label>}


        <StyledButton  type='submit' appendClassName="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> submit </StyledButton>
      </form>
    </div>
  );
}
