package com.murmuler.organicstack.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.util.ArrayList;

@Data
@NoArgsConstructor
public class ReviewVO {
    public final String TYPE_PERIOD_YEAR = "Y";
    public final String TYPE_PERIOD_MONTH = "M";
    public final String TYPE_PERIOD_WEEK = "W";

    private int id;
    private Date writeDate;
    private String title;
    private String content;
    private int locationId;
    private int residencePeriod;
    private String periodUnit;
    private int score;
    private String advantage;
    private String disadvantage;
    private char insectLevel;
    private char noiseLevel;
    private String hashtagExist;
    private String image;
    private String sido;
    private String sigungu;
    private String roadname;
    private String detailAddr;
    private ArrayList<String> hashTagList;
    private int memberId;

    public ReviewVO(int id, Date writeDate, String title, String content, int locationId, int residencePeriod,
                    String periodUnit, int score, String advantage, String disadvantage, char insectLevel, char noiseLevel, String hashtagExist, String image,
                    String sido, String sigungu, String roadname, String detail_addr, ArrayList<String> hashTagList, int memberId) {
        if (writeDate == null)
            writeDate = new Date(new java.util.Date().getTime());
        if (title == null || title.equals(""))
            title = "empty";
        if (content == null || content.equals(""))
            content = "empty";
        if (advantage == null || advantage.equals(""))
            advantage = "empty";
        if (disadvantage == null || disadvantage.equals(""))
            disadvantage = "empty";
        if(sido == null || sido.equals(""))
            sido = "empty";
        if(sigungu == null || sigungu.equals(""))
            sigungu = "empty";
        if(roadname == null || roadname.equals(""))
            roadname = "empty";
        if(detail_addr == null || detail_addr.equals(""))
            detail_addr = "empty";
        this.id = id;
        this.writeDate = writeDate;
        this.title = title;
        this.content = content;
        this.locationId = locationId;
        this.residencePeriod = residencePeriod;
        this.periodUnit = periodUnit;
        this.score = score;
        this.advantage = advantage;
        this.disadvantage = disadvantage;
        this.insectLevel = insectLevel;
        this.noiseLevel = noiseLevel;
        this.hashtagExist = hashtagExist;
        this.image = image;
        this.hashTagList = hashTagList;
        this.memberId = memberId;
    }

}
