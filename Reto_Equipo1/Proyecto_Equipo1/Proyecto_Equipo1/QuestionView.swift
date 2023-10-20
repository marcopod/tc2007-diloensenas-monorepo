//
//  QuestionView.swift
//  Proyecto_Equipo1
//
//  Created by Alumno on 21/09/23.
//

import SwiftUI

struct Question: Identifiable{
    let id = UUID()
    let title: String
    let answer: String
    let options: [String]
    var selection: String?
}

struct QuestionView: View {
    @Binding var question: Question
    
    
    var body: some View {
        VStack(alignment: .leading, spacing: 20){
            Text(question.title)
            
            ForEach(question.options, id:\.self){option in
                HStack {
                    Button{
                        question.selection = option
                        print(option)
                    }label: {
                        if question.selection == option{
                            Circle()
                                .shadow(radius: 3)
                                .frame(width: 24, height: 24)
                                .foregroundColor(Color("QuestionColor"))
                        }else {
                            Circle()
                                .stroke()
                                .shadow(radius: 3)
                                .frame(width: 24, height: 24)
                            
                        }
                    
                    }
                Text(option)
            }
        }
    }
        .foregroundColor(Color(uiColor: .secondaryLabel))
        .padding(.horizontal, 20)
        .frame(width: 330, height: 550, alignment: .leading)
        .background(Color(uiColor: .systemGray6))
        .cornerRadius(20)
        .shadow(color: Color(uiColor: .label).opacity(0.2), radius: 15)
    }
}


struct QuestionView_Previews: PreviewProvider {
    static var previews: some View {
        let sampleQuestion = Question(title: " ¿Qué vehiculo representa la seña? ", answer: "A", options: ["A", "B", "C", "D"])
        return QuestionView(question: .constant(sampleQuestion))
    }
}
