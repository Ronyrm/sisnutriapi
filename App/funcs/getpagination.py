
from flask import current_app
from flask_paginate import Pagination


def get_css_framework():
    temp = current_app.config.get("CSS_FRAMEWORK", "bootstrap4")
    return temp

def get_link_size():
    temp = current_app.config.get("LINK_SIZE", "sm")
    return temp

def get_alignment():
    temp = current_app.config.get("LINK_ALIGNMENT", "")
    return temp

def show_single_page_or_not():
    temp =  current_app.config.get("SHOW_SINGLE_PAGE", False)
    return temp


def get_pagination(**kwargs):
    kwargs.setdefault("record_name", "records")
    return Pagination(

        css_framework=get_css_framework(),
        link_size=get_link_size(),
        alignment=get_alignment(),
        show_single_page=show_single_page_or_not(),
        prev_label='Anterior',
        next_label='Próximo',

        **kwargs
    )