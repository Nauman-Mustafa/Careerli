import os
import openai
import json
from typing import Union

API_KEY = os.environ.get("API_KEY")
openai.api_key = API_KEY
current_path = os.path.dirname(os.path.realpath(__file__))

def sentence_rewriter(text: str, section_type: str) -> Union[str, dict]:
    """
    Paraphrased the provided text.
    Parameters
    ----------
    text : str
        Input text form user.
    section_type: str
        Section type of text i.e. summary, work experience, education, or basic sentence correction.
    Returns
    -------
    str
        Return the paraphrased text.
    """
    SECTIONS = ['summary', 'work', 'education', 'generic', 'cover_letter_introduction', 'cover_letter_body', 'cover_letter_conclusion']
    BASE_PROMPT = []
    
    if section_type not in SECTIONS:
        error = f'No such section_type {section_type}. Please provide correct resume section.'
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({"error": error})
        }

    try:
        
        # if section_type == "work":
            # temperature = 0.7
        # else:
            # temperature = 0.9
        with open(f"{current_path}/prompts/sentence_rewriter_{section_type}.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]
            
        BASE_PROMPT.append({"role":"user", "content":text})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=1.0,
            max_tokens=500,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "sentence_rewriter",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "sentence_rewriter",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(str(e))
        }
def ai_writer_summary(work: list, education: list, skills: list, jobTitle: str, jobDescription: str) -> Union[str, dict]:
    """
    Generate the summary for resume.
    Parameters
    ----------
    work : list
        List of work experience.
    education : list
        List of education.
    skills : list
        List of skills.
    jobTitle :  str
        String containing jobTitle where the person is applying for
    jobDescription : str
        Description for Job
    Returns
    -------
    str
        Return the generated text.
    """

    try:
        work = ' '.join(work)
        education = ' '.join(education)
        skills = ' '.join(skills)
        
        with open(f"prompts/ai_writer_summary.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        if jobTitle!="" and jobDescription!="":
            prompt = f"Job Title:{jobTitle}\nJob Description:{jobDescription}\nWork Experience: {work}\nEducation: {education}\nSkills: {skills}"
            
        elif jobTitle!="":
            prompt = f"Job Title:{jobTitle}\nWork Experience: {work}\nEducation: {education}\nSkills: {skills}"
            
        elif jobDescription!="":
            prompt = f"Job Description:{jobDescription}\nWork Experience: {work}\nEducation: {education}\nSkills: {skills}"
            
        else:
            prompt = f"Work Experience: {work}\nEducation: {education}\nSkills: {skills}"

        BASE_PROMPT.append({"role":"user", "content":prompt})

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.9,
            max_tokens=120,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_summary",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_summary",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_summary_low(jobTitle: str, jobDescription: str) -> Union[str, dict]:
    """
    Generate the summary for resume.
    Parameters
    ----------
    jobTitle : list
        String of Job Titles.
    jobDescription : str
        String of Job Description.
    Returns
    -------
    str
        Return the generated text.
    """

    try:
        jobTitle = ' '.join(jobTitle)
        with open(f"prompts/ai_writer_summary_low.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        if jobDescription!="":
            prompt = f"Job Title: {jobTitle}\nJob Description: {jobDescription}"
        else:
            prompt = f"Job Title: {jobTitle}"

        BASE_PROMPT.append({"role":"user", "content":prompt})

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=1.0,
            max_tokens=125,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_summary_low",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_summary_low",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_work_description(work: list, jobTitle: str, jobDescription: str) -> Union[str, dict]:
    """
    Generate the summary for resume.
    Parameters
    ----------
    work : list
        List of work Titles.
    Returns
    -------
    str
        Return the generated text.
    """

    try:
        work = ' '.join(work)
        with open(f"prompts/ai_writer_work.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]
            
        if jobDescription!="" and jobTitle!="":
            prompt = f"JobTitle: {jobTitle}\nJobDescription: {jobDescription}\nWork Title: {work}"
        elif jobTitle!="":
            prompt = f"JobTitle: {jobTitle}\nWork Title: {work}"
        else:    
            prompt = f"Work Title: {work}"
        
        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.9,
            max_tokens=150,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_work_description",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_work_description",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_education_description(education: list) -> Union[str, dict]:
    """
    Generate the summary for resume.
    Parameters
    ----------
    education : list
        List of education Titles.
    Returns
    -------
    str
        Return the generated text.
    """

    try:
        education = ' '.join(education)

        with open(f"prompts/ai_writer_education.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        prompt = f"Degree Title: {education}"

        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.5,
            max_tokens=150,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_education_description",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_education_description",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_skills(job: list) -> Union[str, dict]:
    """
    Generate the summary for resume.
    Parameters
    ----------
    job : list
        List of job Titles.
    Returns
    -------
    str
        Return the generated text.
    """

    try:
        job = ' '.join(job)

        with open(f"prompts/ai_writer_skills.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        prompt = f"Job Title: {job}"

        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.5,
            max_tokens=70,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_skills",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_skills",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_cover_letter_introduction(companyName:str, jobTitle:str, specialAboutCompany:str, reasonOfBeingSpecial:str) -> Union[str, dict]:
    """
    Generate the cover_letter introduction for resume.
    Parameters
    ----------
    companyName : str
        String contains the comapany name where you are applying
    jobTitle : str
        String contains the jobTitle for the job
    specialAboutCompany : str
        String contains info about why that company is special to you
    reasonOfBeingSpecial : str
        String contains the reason of your being special for the company
    Returns
    -------
    str
        Return the Cover letter introduction.
    """

    try:
        with open(f"prompts/ai_writer_cover_letter_introduction.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        if specialAboutCompany!="" and reasonOfBeingSpecial!="":
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}\nSpecial About Company:{specialAboutCompany}\nReason of being a good fit for this role:{reasonOfBeingSpecial}"
            
        elif specialAboutCompany!="":
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}\nSpecial About Company:{specialAboutCompany}"
        elif reasonOfBeingSpecial!="":
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}\nReason of being a good fit for this role:{reasonOfBeingSpecial}"
        else:
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}"
            
        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.9,
            max_tokens=128,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_cover_letter_introduction",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_cover_letter_introduction",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_cover_letter_body(companyName:str, jobTitle:str, reasonOfBeingSpecial:str) -> Union[str, dict]:
    """
    Generate the cover_letter body for resume.
    Parameters
    ----------
    companyName : str
        String contains the comapany name where you are applying
    jobTitle : str
        String contains the jobTitle for the job
    reasonOfBeingSpecial : str
        String contains the reason of your being special for the company
    Returns
    -------
    str
        Return the Cover letter body.
    """

    try:
        
        with open(f"prompts/ai_writer_cover_letter_body.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        if reasonOfBeingSpecial!="":
            prompt = f"Company Name: {companyName}\nJob Title: {jobTitle}\nReason of being a good fit for this role: {reasonOfBeingSpecial}"
        else:
            prompt = f"Company Name: {companyName}\nJob Title: {jobTitle}"

        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.7,
            max_tokens=256,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_cover_letter_body",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_cover_letter_body",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def ai_writer_cover_letter_conclusion(companyName:str, jobTitle:str, body:str) -> Union[str, dict]:
    """
    Generate the cover_letter conclusion for resume.
    Parameters
    ----------
    companyName : str
        String contains the comapany name where you are applying
    jobTitle : str
        String contains the jobTitle for the job
    body : str
        String contains the body of cover letter.
    Returns
    -------
    str
        Return the Cover letter conclusion.
    """

    try:
        
        with open(f"prompts/ai_writer_cover_letter_conclusion.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]

        if body!="":
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}\nCover Letter Body:{body}"
        else:
            prompt = f"Company Name:{companyName}\nJob Title:{jobTitle}"
    
        BASE_PROMPT.append({"role":"user", "content":prompt})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=0.9,
            max_tokens=80,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "ai_writer_cover_letter_conclusion",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "ai_writer_cover_letter_conclusion",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def sentence_autocomplete_summary(summary:str, input_tokens:int) -> Union[str, dict]:
    """
    Auto Complete the Summary for resume.
    Parameters
    ----------
    summary : str
        String contains the summary to be completed.
    input_tokens : int
        Sentence input tokens
    Returns
    -------
    str
        Return the next predicted summary.
    """

    try:
        with open(f"prompts//sentence_autocomplete_summary.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]
            
        BASE_PROMPT.append({"role":"user", "content":f"Summary:{summary}"})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=1.0,
            max_tokens=20,
        )
        result = response['choices'][0].message.content
        return result
        
    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "sentence_autocomplete_summary",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "sentence_autocomplete_summary",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def sentence_autocomplete_work(work:str, input_tokens:int) -> Union[str, dict]:
    """
    Auto Complete the Work Description for resume.
    Parameters
    ----------
    work : str
        String contains the work description to be completed.
    input_tokens : int
        Sentence input tokens
    Returns
    -------
    str
        Return the next predicted work experience.
    """

    try:
        with open(f"prompts/sentence_autocomplete_work.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]
            
        BASE_PROMPT.append({"role":"user", "content":f"Work Experience:{work}"})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=1.0,
            max_tokens=20,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "sentence_autocomplete_work",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "sentence_autocomplete_work",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }

def sentence_autocomplete_generic(sentence:str, input_tokens:int) -> Union[str, dict]:
    """
    Auto Complete the sentence.
    Parameters
    ----------
    sentence : str
        String contains the sentence to be completed.
    input_tokens : int
        Sentence input tokens
    Returns
    -------
    str
        Return the next predicted words in the sentence.
    """

    try:
        with open(f"prompts/sentence_autocomplete_generic.json") as f:
            BASE_PROMPT = json.load(f)
            BASE_PROMPT = BASE_PROMPT["BASE_PROMPT"]
            
        BASE_PROMPT.append({"role":"user", "content":f"Sentence:{sentence}"})
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=BASE_PROMPT,
            temperature=1.0,
            max_tokens=20,
        )
        result = response['choices'][0].message.content
        return result

    except openai.error.ServiceUnavailableError as service_exception:
        output = {
            "toolType": "sentence_autocomplete_generic",
            "Error": str(service_exception),
            "Message": f"Service unavailable, try again in few minutes.",
            "Traceback": service_exception.error
        }
        return {
            'statusCode': 503,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
    except openai.error.RateLimitError as rate_error:
        output = {
            "toolType": "sentence_autocomplete_generic",
            "Error": "Too many api hits. OpenAI Rate limit reached, try again in a few minutes",
            "Message": f"{rate_error}",
        }
        return {
            'statusCode': 429,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(output)
        }
