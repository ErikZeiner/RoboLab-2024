import google.generativeai as genai
import os
from pyweb import pydom


def get_joke(event):
    pydom["div#outputWindow"].html = "a"

#
#
#
# def sendRequest(model, prompt):
#     text = Element('sendRequestBtn')
#     print(text.element.value)
#     pyscript.write('outputWindow','test')
#     # response = model.generate_content(prompt)
#     # return response.text
#
#
# print('test')
# # if __name__ == '__main__':
# #     text = Element('sendRequestBtn')
# #
# #     genai.configure(api_key='AIzaSyB1eqX5raYM4CmkVP044nkU6Dp9KqDIALM')
# #     model = genai.GenerativeModel('gemini-1.5-flash')
# #     print(chat(model, 'hello'))
