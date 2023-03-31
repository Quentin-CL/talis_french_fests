$(document).ready(function () {
    // Show/hide edit form on click
    $(".dropdown-toggle").on("click", function () {
        $(this).siblings(".dropdown-menu").toggle();
    });

    $(".edit-btn").on("click", function (e) {
        e.preventDefault()
        const commentText = $(this).closest(".comment").find("p").text();
        const $input = $("<textarea>").val(commentText);
        const $btn = $("<button>").html('<i class="fa-solid fa-arrow-right"></i>').addClass("validate-btn");
        $(this).closest(".comment").find("p:not(.starability-result)").replaceWith($input);
        $(this).closest(".comment").find(".comment-text").append($btn);
        $(this).parent().toggle();
        $(this).hide();

    });

    $(document).on("click", ".validate-btn", function () {
        const url = $(this).parent().attr("data-send");
        const $input = $(this).siblings("textarea");
        const newReview = $input.val().trim();
        fetch(url, {
            method: "PUT", // specify the HTTP method as "PUT" since we are updating data
            headers: {
                "Content-Type": "application/json" // specify the content type as JSON
            },
            body: JSON.stringify({ body: newReview }) // pass the comment body as JSON in the request body
        })
            .then(response => {
                if (!response.ok) {
                    $input.replaceWith("<p style='color:red'>" + "Echec de la modification du commentaire !" + "</p>");
                    throw new Error("Echec de la modification du commentaire !");
                }
                return response.json(); // parse the response as JSON
            })
            .then(data => {
                $input.replaceWith("<p>" + data.body + "</p>");
            })
            .catch(error => {
                $input.replaceWith("<p style='color:red'>" + "Echec de la modification du commentaire !" + "</p>");
                console.error(error);
            });
        $(this).closest(".dropdown").find(".edit-btn").show();
        $(this).remove();

    });

    $(".delete-btn").on("click", function (e) {
        e.preventDefault()
        const url = $(this).closest(".comment").find(".comment-text").attr("data-send");
        const comment = $(this).closest(".comment").find("p:not(.starability-result)");
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: ''
        })
            .then(response => {
                if (!response.ok) {
                    comment.replaceWith("<p style='color:red'>" + "Echec de la suppression du commentaire !" + "</p>");
                    throw new Error("Echec de la suppression du commentaire !");
                }
                $(this).closest(".comment").remove();
                return; // parse the response as JSON
            })
            .catch(error => {
                comment.replaceWith("<p style='color:red'>" + "Echec de la suppression du commentaire !" + "</p>");
                console.error(error);
            });


    });




    // $('.edit-comment').on('click', function (e) {
    //     e.preventDefault();
    //     $(this).closest('.comment').find('.comment-body').hide();
    //     $(this).closest('.comment').find('.comment-edit-form').removeClass('display-none');
    //     $(this).closest('.comment').find('.comment-edit-form textarea').val($(this).closest('.comment').find('.comment-body p').text().trim());
    // });

    // // Save edited comment on click
    // $('.save-comment-edit').on('click', function (e) {
    //     e.preventDefault();
    //     var comment = $(this).closest('.comment');
    //     var editedComment = comment.find('.comment-edit-form textarea').val().trim();

    //     // Perform AJAX request to save edited comment
    //     // ...

    //     comment.find('.comment-body p').text(editedComment);
    //     comment.find('.comment-edit-form').addClass('d-none');
    //     comment.find('.comment-body').show();
    // });

    // // Delete comment on click
    // $('.delete-comment').on('click', function (e) {
    //     e.preventDefault();
    //     var comment = $(this).closest('.comment');

    //     // Perform AJAX request to delete
    //     // ...

    //     comment.remove();
    // })
});