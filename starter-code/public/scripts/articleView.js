'use strict';

const articleView = {};

articleView.populateFilters = () => {
    $('article').each(function() {
        if (!$(this).hasClass('template')) {
            let val = $(this).find('address a').text();
            let optionTag = `<option value="${val}">${val}</option>`;

            if ($(`#author-filter option[value="${val}"]`).length === 0) {
                $('#author-filter').append(optionTag);
            }

            val = $(this).attr('data-category');
            optionTag = `<option value="${val}">${val}</option>`;
            if ($(`#category-filter option[value="${val}"]`).length === 0) {
                $('#category-filter').append(optionTag);
            }
        }
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
        $('.tab-content').hide();
        $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            },200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

// COMMENT: When/where is this function invoked? What event ultimately triggers its execution? Explain the sequence of code execution when this function is invoked.
// This function is invoked on the new.html page.  The event that ultimately triggers its execution is when the event listeners "hear" a change, or input of text on the id new-form. 
articleView.initNewArticlePage = () => {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#article-json').on('focus', function(){
        this.select();
    });

    $('#new-form').on('change', 'input, textarea', articleView.create);
    $('#new-form').on('submit', articleView.submit);
};

// COMMENT: When is this function called? What event ultimately triggers its execution?
// This function is called right here (?).  The event that triggers its execution is the event handler listening for a change or input (line 85). Then it creates the article view here (line 91) and on line 129 it's inserted into the record.
articleView.create = () => {
    let article;
    $('#articles').empty();

const article = new Article({
        title: $('#article-title').val(),
        author: $('#article-author').val(),
        authorUrl: $('#article-author-url').val(),
        category: $('#article-category').val(),
        body: $('#article-body').val(),
        publishedOn: $('#article-published:checked').length ? new Date() : null
    });

    $('#articles').append(article.toHtml());

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('#export-field').show();
    $('#article-json').val(`${JSON.stringify(article)},`);
};

// COMMENT: When is this function called? What event ultimately triggers its execution?
// This function is also being called right here (I think??), on line 116.  The event which ultimately triggers its execution is listening for the submit button being clicked (line 86). Then it submits the articleView (line 116) and inserts it into the record (line 129).
articleView.submit = event => {
    event.preventDefault();
    const article = new Article({
        title: $('#article-title').val(),
        author: $('#article-author').val(),
        authorUrl: $('#article-author-url').val(),
        category: $('#article-category').val(),
        body: $('#article-body').val(),
        publishedOn: $('#article-published:checked').length ? new Date() : null
    });

    // COMMENT: Where is this function defined? When is this function called? What event ultimately triggers its execution?
    // I think it is being defined on line 47 in article.js.  The function is called on line 129.  Ultimately, what triggers its execution is when a new article is entered into the submit form.
    article.insertRecord();
};

articleView.initIndexPage = () => {
    Article.all.forEach(article =>{
        $('#articles').append(article.toHtml());
    });

    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
};
