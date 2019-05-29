import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

    constructor() { }

    isEmpty(str) {
        return (!str || str == undefined || str == "" || 0 === str.length);
    }

    isContainHTMLTag(userInput) {
        let regex = /<\/?[\w\s="/.':;#-\/\?]+>/;
        var res = userInput.match(regex);
        if (res == null)
            return false;
        else
            return true;
    }

    isContainScript(description) {
        var pattern = /<[^>]*script/;
        return pattern.test(description);
    }

    replaceHTML(bodyText) {
        var regex = /(<([^>]+)>)/ig
        return bodyText.replace(regex, "");
    }

    isContainOnlySpecialCharactor(userInput) {
        let regex = /^[^a-zA-Z0-9]+$/;
        var res = userInput.match(regex);
        if (res == null)
            return false;
        else
            return true;
    }

    isUrlValid(userInput) {
        let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;
        var res = userInput.match(regex);
        if (res == null)
            return false;
        else
            return true;
    }

    isValidImageUrl(userInput) {
        if (!userInput || (/\.(jpg|jpeg|png)$/i).test(userInput.trim())) {
            return true;
        }
        return false;
    }

    isContainUrl(userInput) {
        let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;
        var res = userInput.match(regex);
        if (res == null)
            return false;
        else
            return true;
    }

    isContainExtensions(userInput) {
        if (!userInput || (/\.(pdf|mp4|gif|ogg|jpg|jpeg|png)$/i).test(userInput.trim())) {
            return true;
        }
        return false;
    }

    wrapTextTitle(title: String, limit: number): String {
        if (title.length > limit) {
            return title.substring(0, limit) + "...";
        }
        return title;
    }
}