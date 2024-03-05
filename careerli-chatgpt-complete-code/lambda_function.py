"""Main file to handle request and response."""
import json
import traceback

from utils import param_check

from resume_tools import (
    sentence_rewriter,
    ai_writer_summary,
    ai_writer_summary_low,
    ai_writer_work_description,
    ai_writer_education_description,
    ai_writer_cover_letter_introduction,
    ai_writer_cover_letter_body,
    ai_writer_cover_letter_conclusion,
    ai_writer_skills,
    sentence_autocomplete_summary,
    sentence_autocomplete_work,
    sentence_autocomplete_generic
)


def lambda_handler(event_jsonfield, context):
    """
    Handle the API request.

    Parameters
    ----------
    event_jsonfield : TYPE
        Request data.
    context : TYPE
        context.

    Returns
    -------
    TYPE
        Response against the specific request.

    """
    outputs = {}
    event = event_jsonfield['body']
    event = json.loads(event, strict=False)
    out = ''

    try:
        request_fields = event.keys()

        if 'toolType' not in request_fields:
            error = 'toolType is missing. Please check your input.'
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({"error": error})
            }
        tool_type = event['toolType']
        params_record = {
            # ------------------- Resume Tools ------------------------------ #
            'sentence_rewriter': ['text', "section_type"],
            'ai_writer_summary': ['work', "education", "skills", 'jobTitle', 'jobDescription'],
            'ai_writer_summary_low':['jobTitle', 'jobDescription'],
            'ai_writer_work_description':['work', 'jobTitle', 'jobDescription'],
            'ai_writer_education_description':['education'],
            'ai_writer_skills':['job'],
            'ai_writer_cover_letter_introduction': ['companyName', 'jobTitle', 'specialAboutCompany', 'reasonOfBeingSpecial'],
            'ai_writer_cover_letter_body':['companyName', 'jobTitle', 'reasonOfBeingSpecial'],
            'ai_writer_cover_letter_conclusion':['companyName', 'jobTitle', 'body'],
            'sentence_autocomplete_summary':['summary', 'input_tokens'],
            'sentence_autocomplete_work':['work', 'input_tokens'],
            'sentence_autocomplete_generic':['sentence', 'input_tokens']
        }
            # ------------------- Resume Paraphrased ------------------------ #
        if tool_type == 'sentence_rewriter':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                text = event['text']
                section_type = event['section_type']
                out = sentence_rewriter(text=text, section_type=section_type)
            # ------------------- Resume summary ---------------------------- #
        elif tool_type == 'ai_writer_summary':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                work = event['work']
                education = event['education']
                skills = event['skills']
                jobTitle = event['jobTitle']
                jobDescription = event['jobDescription']
                
                out = ai_writer_summary(work=work,
                                     education=education,
                                     skills=skills,
                                     jobTitle=jobTitle,
                                     jobDescription=jobDescription
                                     )
        elif tool_type == 'ai_writer_summary_low':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                jobTitle = event['jobTitle']
                jobDescription = event['jobDescription']
                
                out = ai_writer_summary_low(jobTitle=jobTitle,
                                            jobDescription=jobDescription
                                            )
            # ------------------- Skills Recommendation  ------------------- #
        elif tool_type == 'ai_writer_skills':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                job = event['job']
                out = ai_writer_skills(job=job)    
            # ------------------- Work Description  ------------------- #
        elif tool_type == 'ai_writer_work_description':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                work = event['work']
                jobTitle = event['jobTitle']
                jobDescription = event['jobDescription']
                out = ai_writer_work_description(work=work, jobTitle=jobTitle, jobDescription=jobDescription)
            # ------------------- Education Description  ------------------- #
        elif tool_type == 'ai_writer_education_description':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                education = event['education']
                out = ai_writer_education_description(education=education)
            # ------------------- Cover Letter Introduction---------------------------- #
        elif tool_type == 'ai_writer_cover_letter_introduction':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                companyName = event['companyName']
                jobTitle = event['jobTitle']
                specialAboutCompany = event['specialAboutCompany']
                reasonOfBeingSpecial = event['reasonOfBeingSpecial']
                out = ai_writer_cover_letter_introduction(companyName, jobTitle, specialAboutCompany, reasonOfBeingSpecial)
            # ------------------- Cover Letter Body---------------------------- #
        elif tool_type == 'ai_writer_cover_letter_body':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                companyName = event['companyName']
                jobTitle = event['jobTitle']
                reasonOfBeingSpecial = event['reasonOfBeingSpecial']
                out = ai_writer_cover_letter_body(companyName, jobTitle, reasonOfBeingSpecial)
            # ------------------- Cover Letter Conclusion---------------------------- #
        elif tool_type == 'ai_writer_cover_letter_conclusion':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                companyName = event['companyName']
                jobTitle = event['jobTitle']
                body = event['body']
                out = ai_writer_cover_letter_conclusion(companyName, jobTitle, body)
            # ------------------- Sentence  Auto Complete Summary ---------------------------- #
        elif tool_type == 'sentence_autocomplete_summary':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                summary = event['summary']
                input_tokens = event['input_tokens']
                out = sentence_autocomplete_summary(summary, input_tokens)
             # ------------------- Sentence  Auto Complete Work ---------------------------- #
        elif tool_type == 'sentence_autocomplete_work':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                work = event['work']
                input_tokens = event['input_tokens']
                out = sentence_autocomplete_work(work, input_tokens)
             # ------------------- Sentence  Auto Complete Generic ---------------------------- #
        elif tool_type == 'sentence_autocomplete_generic':
            params = param_check(params_provided=request_fields,
                                 params_required=params_record.get(tool_type))
            if isinstance(params, dict):
                return params
            else:
                sentence = event['sentence']
                input_tokens = event['input_tokens']
                out = sentence_autocomplete_generic(sentence, input_tokens)

        # --------------------- Returning Results ----------------------------#

        outputs['output'] = out
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(outputs)
        }

    except Exception as e:
        outputs['error'] = str(traceback.format_exc())

        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(outputs)
        }
