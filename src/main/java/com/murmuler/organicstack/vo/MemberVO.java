package com.murmuler.organicstack.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class MemberVO {
    private int memberId;
    private String id;
    private String name;
    private String gender;
    private Date birth;
    private String phone;
    private String pwd;
    private String email;
    private String nickname;

    private String[] ids;

    public MemberVO(int memberId, String id, String name, String gender, Date birth, String phone, String pwd, String email, String nickname) {
        if (id == null || id.equals("")) id = "empty";
        if (name == null || id.equals("")) name = "empty";
        if (birth == null) birth = new Date();
        if (phone == null || phone.equals("")) phone = "empty";
        if (pwd == null || pwd.equals("")) pwd = "empty";
        if (email == null || email.equals("")) email = "empty";
        if (nickname == null || nickname.equals("")) nickname = "empty";
        this.memberId = memberId;
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.phone = phone;
        this.pwd = pwd;
        this.email = email;
        this.nickname = nickname;
    }
}